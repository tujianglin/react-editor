interface TextEncoding {
  getUTF8BufferLength(input: string): number;
  toUTF8Buffer(input: string, output: Uint8Array): number;
  toUTF8String(input: Uint8Array): string;
}

let Encoding: TextEncoding;
const _getUTF8BufferLength = (input: string) => {
  let output = 0;
  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i);
    if (charCode > 0x7ff) {
      if (0xd800 <= charCode && charCode <= 0xdbff) {
        i++;
        output++;
      }
      output += 3;
    } else if (charCode > 0x7f) output += 2;
    else output++;
  }
  return output;
};
if (TextEncoder && TextDecoder) {
  Encoding = {
    getUTF8BufferLength: _getUTF8BufferLength,
    toUTF8Buffer: (input: string, output: Uint8Array) => {
      const encoder = new TextEncoder();
      const r = encoder.encodeInto(input, output);
      return r.written;
    },
    toUTF8String: (input: Uint8Array) => {
      const decoder = new TextDecoder('utf-8');
      return decoder.decode(input);
    },
  };
} else {
  Encoding = {
    getUTF8BufferLength: _getUTF8BufferLength,
    toUTF8Buffer: (input: string, output: Uint8Array) => {
      let pos = 0;
      for (let i = 0; i < input.length; i++) {
        let charCode = input.charCodeAt(i);
        if (0xd800 <= charCode && charCode <= 0xdbff) {
          const lowCharCode = input.charCodeAt(++i);
          if (isNaN(lowCharCode)) {
            throw new Error('MALFORMED UNICODE');
          }
          charCode = ((charCode - 0xd800) << 10) + (lowCharCode - 0xdc00) + 0x10000;
        }
        if (charCode <= 0x7f) {
          output[pos++] = charCode;
        } else if (charCode <= 0x7ff) {
          output[pos++] = ((charCode >> 6) & 0x1f) | 0xc0;
          output[pos++] = (charCode & 0x3f) | 0x80;
        } else if (charCode <= 0xffff) {
          output[pos++] = ((charCode >> 12) & 0x0f) | 0xe0;
          output[pos++] = ((charCode >> 6) & 0x3f) | 0x80;
          output[pos++] = (charCode & 0x3f) | 0x80;
        } else {
          output[pos++] = ((charCode >> 18) & 0x07) | 0xf0;
          output[pos++] = ((charCode >> 12) & 0x3f) | 0x80;
          output[pos++] = ((charCode >> 6) & 0x3f) | 0x80;
          output[pos++] = (charCode & 0x3f) | 0x80;
        }
      }
      return pos;
    },
    toUTF8String: (input: Uint8Array) => {
      let output = '';
      let utf16;
      let pos = 0;

      while (pos < input.length) {
        const byte1 = input[pos++];
        if (byte1 < 128) utf16 = byte1;
        else {
          const byte2 = input[pos++] - 128;
          if (byte2 < 0) throw new Error('Malformed UTF data');
          if (byte1 < 0xe0)
            // 2 byte character
            utf16 = 64 * (byte1 - 0xc0) + byte2;
          else {
            const byte3 = input[pos++] - 128;
            if (byte3 < 0) throw new Error('Malformed UTF data');
            if (byte1 < 0xf0)
              // 3 byte character
              utf16 = 4096 * (byte1 - 0xe0) + 64 * byte2 + byte3;
            else {
              const byte4 = input[pos++] - 128;
              if (byte4 < 0) throw new Error('Malformed UTF data');
              if (byte1 < 0xf8)
                // 4 byte character
                utf16 = 262144 * (byte1 - 0xf0) + 4096 * byte2 + 64 * byte3 + byte4;
              // longer encodings are not supported
              else throw new Error('Malformed UTF data');
            }
          }
        }

        if (utf16 > 0xffff) {
          // 4 byte character - express as a surrogate pair
          utf16 -= 0x10000;
          output += String.fromCharCode(0xd800 + (utf16 >> 10)); // lead character
          utf16 = 0xdc00 + (utf16 & 0x3ff); // trail character
        }
        output += String.fromCharCode(utf16);
      }
      return output;
    },
  };
}

export class BinaryWriter {
  private _buffer: DataView;
  private _length: number;
  public constructor(capacity: number) {
    if (capacity < 64) capacity = 64;
    this._buffer = new DataView(new ArrayBuffer(capacity));
    this._length = 0;
  }

  public get Position(): number {
    return this._length;
  }

  public set Position(value: number) {
    this._length = value;
  }

  public WriteBoolean(value: boolean) {
    this.WriteUint8(value ? 1 : 0);
  }

  public WriteString(value: string) {
    const len = Encoding.getUTF8BufferLength(value);
    this.Write7BitEncodedInt(len);

    const offset = this._length;
    this._resize(len + this._length);
    Encoding.toUTF8Buffer(value, new Uint8Array(this._buffer.buffer, offset));
  }

  public WriteUint8(value: number) {
    const offset = this._length;
    this._resize(1 + this._length);
    this._buffer.setUint8(offset, value);
  }

  public WriteInt8(value: number) {
    const offset = this._length;
    this._resize(1 + this._length);
    this._buffer.setInt8(offset, value);
  }

  public WriteUint16(value: number) {
    const offset = this._length;
    this._resize(2 + this._length);
    this._buffer.setUint16(offset, value, true);
  }

  public WriteInt16(value: number) {
    const offset = this._length;
    this._resize(2 + this._length);
    this._buffer.setInt16(offset, value, true);
  }

  public WriteInt32(value: number) {
    const offset = this._length;
    this._resize(4 + this._length);
    this._buffer.setInt32(offset, value, true);
  }

  public WriteUint32(value: number) {
    const offset = this._length;
    this._resize(4 + this._length);
    this._buffer.setUint32(offset, value, true);
  }

  public WriteInt64(value: number | string) {
    if (BigInt) {
      const offset = this._length;
      this._resize(8 + this._length);
      this._buffer.setBigInt64(offset, BigInt(value), true);
    } else {
      const s64 = value.toString(16).padStart(16, '0');
      const h = Number('0x' + s64.substring(0, 8));
      const l = Number('0x' + s64.substring(8));
      this.WriteUint32(l);
      this.WriteUint32(h);
    }
  }

  public WriteUint64(value: number | string) {
    if (BigInt) {
      const offset = this._length;
      this._resize(8 + this._length);
      this._buffer.setBigUint64(offset, BigInt(value), true);
    } else {
      const s64 = value.toString(16).padStart(16, '0');
      const h = Number('0x' + s64.substring(0, 8));
      const l = Number('0x' + s64.substring(8));
      this.WriteUint32(l);
      this.WriteUint32(h);
    }
  }

  public Write7BitEncodedInt(value: number) {
    const mask = 0x7f;
    let temp = 0;
    do {
      temp = value & mask;
      value = value >> 7;
      if (value > 0) temp = temp | 0x80;
      this.WriteUint8(temp);
    } while (value > 0);
  }

  public WriteFloat(value: number) {
    const offset = this._length;
    this._resize(4 + this._length);
    this._buffer.setFloat32(offset, value, true);
  }

  public WriteDouble(value: number) {
    const offset = this._length;
    this._resize(8 + this._length);
    this._buffer.setFloat64(offset, value, true);
  }

  public WriteBytes(value: Uint8Array) {
    let offset = this._length;
    this._resize(value.byteLength + this._length);
    const buffer = new Uint8Array(this._buffer.buffer);
    for (let i = 0; i < value.byteLength; ++i) {
      buffer[offset++] = value[i];
    }
  }

  public WriteArray<T>(value: Array<T>, writeelCallback: (value: T) => void) {
    const length = value.length;
    this.Write7BitEncodedInt(length);
    for (let i = 0; i < length; ++i) {
      writeelCallback.call(this, value[i]);
    }
  }

  public ToBytes() {
    return new Uint8Array(this._buffer.buffer, 0, this._length);
  }
  private _resize(newlength: number) {
    if (this._buffer.byteLength < newlength) {
      let capacity = 0;
      if (newlength > 1024 * 1024) capacity = newlength + 1024 * 1024;
      else capacity = newlength * 2;
      const newbuffer = new Uint8Array(new ArrayBuffer(capacity));
      const oldbuffer = new Uint8Array(this._buffer.buffer);
      for (let i = 0; i < this._length; ++i) {
        newbuffer[i] = oldbuffer[i];
      }
      this._buffer = new DataView(newbuffer.buffer);
    }
    this._length = newlength;
  }
}

export class BinaryReader {
  private _buffer: DataView;
  private _offset: number;
  public constructor(data: ArrayBuffer) {
    this._buffer = new DataView(data);
    this._offset = 0;
  }

  public get Position(): number {
    return this._offset;
  }

  public Skip(count: number) {
    this._offset += count;
  }

  public ReadBoolean(): boolean {
    const value = this.ReadUint8();
    return value != 0;
  }

  public ReadString(): string {
    const len = this.Read7BitEncodedInt();
    const result = Encoding.toUTF8String(new Uint8Array(this._buffer.buffer, this._offset, len));
    this._offset += len;
    return result;
  }

  public ReadUint8(): number {
    const result = this._buffer.getUint8(this._offset);
    this._offset++;
    return result;
  }

  public ReadInt8(): number {
    const result = this._buffer.getInt8(this._offset);
    this._offset++;
    return result;
  }

  public ReadUint16(): number {
    const result = this._buffer.getUint16(this._offset, true);
    this._offset += 2;
    return result;
  }

  public ReadInt16(): number {
    const result = this._buffer.getInt16(this._offset, true);
    this._offset += 2;
    return result;
  }

  public ReadInt32(): number {
    const result = this._buffer.getInt32(this._offset, true);
    this._offset += 4;
    return result;
  }

  public ReadUint32(): number {
    const result = this._buffer.getUint32(this._offset, true);
    this._offset += 4;
    return result;
  }

  public ReadInt64(): number {
    if (BigInt) {
      const l = BigInt(this.ReadUint32());
      const h = BigInt(this.ReadUint32());
      return Number(l | (h << 32n));
    } else {
      const l = this.ReadUint32().toString(16).padStart(8, '0');
      const h = this.ReadUint32().toString(16).padStart(8, '0');
      return Number('0x' + h + l);
    }
  }

  public ReadUint64(): number {
    if (BigInt) {
      const l = BigInt(this.ReadUint32());
      const h = BigInt(this.ReadUint32());
      return Number(l | (h << 32n));
    } else {
      const l = this.ReadUint32().toString(16).padStart(8, '0');
      const h = this.ReadUint32().toString(16).padStart(8, '0');
      return Number('0x' + h + l);
    }
  }

  public Read7BitEncodedInt(): number {
    const mask = 0x7f;
    let temp = 0;
    let result = 0;
    let bit = 0;

    for (let i = 0; i < 10; ++i) {
      temp = this.ReadUint8();
      result = result | ((temp & mask) << bit);
      if ((temp & 0x80) !== 0x80) break;
      bit += 7;
    }
    return result;
  }

  public ReadFloat(): number {
    const result = this._buffer.getFloat32(this._offset, true);
    this._offset += 4;
    return result;
  }

  public ReadDouble(): number {
    const result = this._buffer.getFloat64(this._offset, true);
    this._offset += 8;
    return result;
  }

  public ReadBytes(count: number): Uint8Array {
    const result = new Uint8Array(this._buffer.buffer, this._offset, count);
    this._offset += count;
    return result;
  }

  public ReadArray<T>(readelCallback: () => T): Array<T> {
    const result = new Array<T>();
    const length = this.Read7BitEncodedInt();
    for (let i = 0; i < length; ++i) {
      result.push(readelCallback.call(this));
    }
    return result;
  }
}
