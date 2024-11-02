export const ENCRYPTION_KEY = process.env.NEXT_PRIVATE_ENCRYPTION_KEY;

export const ENCRYPTION_SECONDARY_KEY = process.env.NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY;

if (typeof window === 'undefined') {
  if (!ENCRYPTION_KEY || !ENCRYPTION_SECONDARY_KEY) {
    throw new Error('Missing ENCRYPTION_KEY or ENCRYPTION_SECONDARY_KEY keys');
  }

  if (ENCRYPTION_KEY === ENCRYPTION_SECONDARY_KEY) {
    throw new Error(
      'ENCRYPTION_KEY and ENCRYPTION_SECONDARY_KEY cannot be equal',
    );
  }
}

if (ENCRYPTION_KEY === 'CAFEBABE') {
  console.warn('*********************************************************************');
  console.warn('*');
  console.warn('*');
  console.warn('Please change the encryption key from the default value of "CAFEBABE"');
  console.warn('*');
  console.warn('*');
  console.warn('*********************************************************************');
}
