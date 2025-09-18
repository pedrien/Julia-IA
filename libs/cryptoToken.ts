import "server-only";
import { ENV } from "@/env";

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  return Buffer.from(
    buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
  ).toString("base64");
}
function base64ToUint8Array(base64: string): Uint8Array {
  if (!base64 || typeof base64 !== "string") {
    throw new TypeError(
      "L'argument base64 doit être une chaîne de caractères non vide."
    );
  }
  const buffer = Buffer.from(base64, "base64");
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
}

const ALGORITHM = "AES-GCM";
const IV_LENGTH = 12; // 96 bits recommandé pour GCM
const KEY_B64 = ENV.TOKEN_ENCRYPTION_KEY!;

async function getCryptoKey(): Promise<CryptoKey> {
  const keyBuffer = base64ToUint8Array(KEY_B64);
  return await crypto.subtle.importKey(
    "raw",
    new Uint8Array(keyBuffer),
    { name: ALGORITHM },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a token string using AES-256-CBC encryption.
 *
 * @param {string} token - The token string to encrypt.
 * @returns {string} The encrypted token, encoded as a base64 IV and base64 ciphertext separated by a colon.
 *
 * @example
 * const encrypted = encryptToken("my-secret-token");
 * // encrypted => "base64-iv:base64-ciphertext"
 */
export async function encryptToken(token: string): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
  const key = await getCryptoKey();
  const encoded = new TextEncoder().encode(token);
  const ciphertext = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoded
  );
  return `${arrayBufferToBase64(iv)}:${arrayBufferToBase64(ciphertext)}`;
}

/**
 * Decrypts an encrypted token string produced by {@link encryptToken}.
 *
 * @param {string} encrypted - The encrypted token string, formatted as "base64-iv:base64-ciphertext".
 * @returns {string} The decrypted original token string.
 *
 * @example
 * const decrypted = decryptToken(encrypted);
 * // decrypted => "my-secret-token"
 */
export async function decryptToken(encrypted: string): Promise<string> {
  const [ivB64, ciphertextB64] = encrypted.split(":");
  if (!ivB64 || !ciphertextB64) {
    throw new Error("Invalid token format");
  }
  const iv = new Uint8Array(base64ToUint8Array(ivB64));
  const ciphertext = new Uint8Array(base64ToUint8Array(ciphertextB64));
  const key = await getCryptoKey();
  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    ciphertext
  );
  return new TextDecoder().decode(decrypted);
}
