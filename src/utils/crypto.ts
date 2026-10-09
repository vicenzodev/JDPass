import crypto from 'crypto';

const ALGORITMO = 'aes-256-cbc';

const getEncryptionKey = () => {
  const secret = process.env.ENCRYPTION_KEY;

  if (!secret) {
    throw new Error('ENCRYPTION_KEY não está configurada no ambiente');
  }

  const key = Buffer.from(secret, 'utf8');

  if (key.length !== 32) {
    throw new Error('ENCRYPTION_KEY deve possuir exatamente 32 bytes para AES-256-CBC');
  }

  return key;
};

export const criptografarSenha = (senha: string) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITMO, getEncryptionKey(), iv);

  const encriptado = Buffer.concat([
    cipher.update(senha, 'utf8'),
    cipher.final(),
  ]);

  return `${iv.toString('hex')}:${encriptado.toString('hex')}`;
};

export const descriptografarSenha = (textoNoBanco: string) => {
  const [ivHex, conteudoEncriptadoHex] = textoNoBanco.split(':');

  if (!ivHex || !conteudoEncriptadoHex) {
    throw new Error('Formato de credencial criptografada inválido');
  }

  const iv = Buffer.from(ivHex, 'hex');
  const conteudoEncriptado = Buffer.from(conteudoEncriptadoHex, 'hex');

  const decipher = crypto.createDecipheriv(
    ALGORITMO,
    getEncryptionKey(),
    iv
  );

  const descriptografado = Buffer.concat([
    decipher.update(conteudoEncriptado),
    decipher.final(),
  ]);

  return descriptografado.toString('utf8');
};
