import crypto from 'crypto';

const CHAVE_SECRETA = process.env.ENCRYPTION_KEY || 'uma-chave-super-secreta-com-32-chars'; 
const ALGORITMO = 'aes-256-cbc';

export const criptografarSenha = (senha: string) => {
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(ALGORITMO, Buffer.from(CHAVE_SECRETA), iv);
  
  let encriptado = cipher.update(senha);
  encriptado = Buffer.concat([encriptado, cipher.final()]);
  return `${iv.toString('hex')}:${encriptado.toString('hex')}`;
};

export const descriptografarSenha = (textoNoBanco: string) => {
  const [ivHex, conteudoEncriptadoHex] = textoNoBanco.split(':');
  
  const iv = Buffer.from(ivHex, 'hex');
  const conteudoEncriptado = Buffer.from(conteudoEncriptadoHex, 'hex');
  
  const decipher = crypto.createDecipheriv(ALGORITMO, Buffer.from(CHAVE_SECRETA), iv);
  
  let descriptografado = decipher.update(conteudoEncriptado);
  descriptografado = Buffer.concat([descriptografado, decipher.final()]);

  return descriptografado.toString();
};