import { IObjeto } from '../types/carga';
import { IOptionsInsertObject, serializeQueryInsertObjeto } from '../utils/carga';
import { currentDateDiff } from '../utils/dates';
import mysql from './connection';

class CargaRepository {
  private repository = mysql;
  private diasRetroativos: number;

  constructor(private sto: string) {
    this.sto = sto;
    this.diasRetroativos = 15;
  }

  async findPlps() {
    const { today, lastDay } = currentDateDiff(this.diasRetroativos);

    const [plps]: [[{ plp: string; etiqueta: string }]] = await this.repository.execute(`
      SELECT
        DISTINCT plp,
        obj etiqueta
      FROM
      \`${this.sto}\`.carga_objeto o
        JOIN exitoinf.clientes c ON o.id_cliente = c.id
      WHERE
        data_hora_plp BETWEEN "${lastDay}" AND "${today}"
        AND sigepWeb = 1
        AND plp > 0
        AND pacotePostagem <> ""
        and status IN(2, 3)
    `);

    return plps;
  }

  async find() {
    const { today, lastDay } = currentDateDiff(this.diasRetroativos);
    const [objetos]: [IObjeto[]] = await this.repository.execute(`
      SELECT
        obj etiqueta,
        pacotePostagem,
        codCliente clienteId,
        c.id_acf agfId,
        Departamento departamento,
        COALESCE(Os, Os, "") os,
        nome_rem nomeRemetente,
        endereco_rem enderecoRemetente,
        numero_rem numeroRemetente,
        complemento_rem complementoRemetente,
        bairro_rem bairroRemetente,
        cidade_rem cidadeRemetente,
        uf_rem ufRemetente,
        cep_rem cepRemetente,
        s.nome nomeServico,
        o.produto
      FROM
        \`${this.sto}\`.carga_objeto o
        JOIN exitoinf.clientes c ON o.id_cliente = c.id
        LEFT JOIN exitoinf.servicos s on s.codigo = o.servico
      WHERE
        data_hora_plp BETWEEN "${lastDay}" AND "${today}"
        AND sigepWeb = 1
        AND plp > 0
        AND pacotePostagem <> ""
        and status IN(2, 3)
    `);

    return objetos;
  }

  async save(objeto: IObjeto, options: IOptionsInsertObject) {
    const query = serializeQueryInsertObjeto(this.sto, objeto, options);
    try {
      await this.repository.execute(query);
    } catch (error) {}
  }
}
export default CargaRepository;
