import { IObjeto } from '../types/carga';
import { IObjetoPostal, IPlp, IRemetente } from '../types/wsCorreio';
import { formatDate } from './dates';

export interface IOptionsInsertObject {
  objetoPostal: IObjetoPostal;
  plp: IPlp;
  remetente: IRemetente;
}

export const serializeQueryInsertObjeto = (
  sto: string,
  objeto: IObjeto,
  options: IOptionsInsertObject,
) => {
  const { remetente, plp, objetoPostal } = options;
  const { dimensao_altura, dimensao_largura, dimensao_comprimento } = objetoPostal.dimensao_objeto;
  const { codigo_servico_adicional, valor_declarado } = objetoPostal.servico_adicional;
  const peso = +objetoPostal.peso / 1000;
  const ar = +codigo_servico_adicional === 1 ? 1 : 0;
  const mp = +codigo_servico_adicional === 2 ? 2 : 0;
  const valorAR = ar * 5.75;
  const valorMP = mp * 6.8;
  const fatorVD = objeto.pacotePostagem === 'A VISTA' ? 0.02 : 0.01;
  const vd = +valor_declarado?.replace(',', '.') || 0;
  const valorDeclarado = vd > 0 ? fatorVD * vd : vd;
  const valorTotal = valorAR + valorMP + valorDeclarado;

  return `
  INSERT INTO
  \`${sto}\`.objetos(
    Objeto,
    codCliente,
    DataEnvio,
    Status,
    tipo,
    Destinatario,
    Endereco,
    numero,
    complemento,
    bairro,
    Cidade,
    UF,
    CEP,
    Valor,
    valorTab,
    Departamento,
    codServico,
    Servico,
    OS,
    qtd,
    contrato,
    cartao,
    ACF,
    vlrCob,
    qtdCobrado,
    Peso,
    ar,
    largura,
    comprimento,
    altura,
    nome_rem,
    endereco_rem,
    numero_rem,
    complemento_rem,
    bairro_rem,
    cidade_rem,
    uf_rem,
    cep_rem,
    sigepWeb,
    plp,
    diametro,
    pacoteTab,
    mp,
    vlrDecla,
    produto,
    conteudo
    )
  VALUES
  (
      "${objeto.etiqueta}",
      ${objeto.clienteId},
      "${formatDate(objetoPostal.data_postagem_sara)}",
      "Postado",
      "P",
      "${objetoPostal.destinatario.nome_destinatario}",
      "${objetoPostal.destinatario.logradouro_destinatario}",
      "${objetoPostal.destinatario.numero_end_destinatario}",
      "${objetoPostal.destinatario.complemento_destinatario}",
      "${objetoPostal.nacional.bairro_destinatario}",
      "${objetoPostal.nacional.cidade_destinatario}",
      "${objetoPostal.nacional.uf_destinatario}",
      "${objetoPostal.nacional.cep_destinatario}",
      "${objetoPostal.valor_cobrado}",
      "${+valorTotal.toFixed(2)}",
      "${objeto.departamento}",
      "${objetoPostal.codigo_servico_postagem}",
      "${objeto.nomeServico || ''}",
      "${objeto.os}",
      1,
      "${remetente.numero_contrato}",
      "${plp.cartao_postagem}",
      "${plp.nome_unidade_postagem}",
      "${objetoPostal.valor_cobrado}",
      "1",
      "${peso}",
      "${ar}",
      "${dimensao_largura.replace(',', '.')}",
      "${dimensao_comprimento.replace(',', '.')}",
      "${dimensao_altura.replace(',', '.')}",
      "${remetente.nome_remetente}",
      "${remetente.logradouro_remetente}",
      "${remetente.numero_remetente}",
      "${remetente.complemento_remetente}",
      "${remetente.bairro_remetente}",
      "${remetente.cidade_remetente}",
      "${remetente.uf_remetente}",
      "${remetente.cep_remetente}",
      "1",
      "${plp.id_plp}",
      "0",
      "${objeto.pacotePostagem}",
      "${mp}",
      "${vd}",
      "${objeto.produto}",
      "${objeto.produto}"
    )
  `;
};
