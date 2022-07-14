import CargaRepository from '../models/carga';
import { ISolicitaXmlPlpSerialized } from '../types/wsCorreio';
import CorreioService from './correio';
import { IObjeto } from '../types/carga';
import AcfRepository from '../models/acf';

class LimpaGrid {
  private acfRepository = new AcfRepository();
  private correioServices = new CorreioService();
  private cargaRepository: CargaRepository;
  private objetosNaoLocalizados: IObjeto[];
  private objetosErroProcessamento: IObjeto[];
  private objetosNaoPostados: IObjeto[];
  private objetosOK: IObjeto[];

  constructor() {
    this.cargaRepository = null;
    this.objetosNaoLocalizados = [];
    this.objetosErroProcessamento = [];
    this.objetosNaoPostados = [];
    this.objetosOK = [];
    this.loadModules();
  }

  async loadModules(sto: string = '') {
    this.cargaRepository = new CargaRepository(sto);
  }

  async resetStatusResult() {
    this.objetosNaoLocalizados = [];
    this.objetosErroProcessamento = [];
    this.objetosOK = [];
    this.objetosNaoPostados = [];
  }

  findObjectInPlp(etiqueta: string, plps: ISolicitaXmlPlpSerialized[]) {
    const filterPlpsSuccessfully = plps.filter((plp) => plp?.correioslog);

    for (const plp of filterPlpsSuccessfully) {
      if (!plp?.correioslog) return;

      const objetoPostal = plp.correioslog.objeto_postal.find(
        ({ numero_etiqueta }) => numero_etiqueta === etiqueta,
      );

      if (objetoPostal) {
        return {
          plp: plp.correioslog.plp,
          remetente: plp.correioslog.remetente,
          objetoPostal,
        };
      }
    }
  }

  async init() {
    const agfs = await this.acfRepository.find();

    for (const agf of agfs) {
      console.log(`AGF: ${agf.id}`);

      await this.loadModules(agf.sto);
      const plpsSync: ISolicitaXmlPlpSerialized[] = [];
      const plps = await this.cargaRepository.findPlps();
      const objetosCarga = await this.cargaRepository.find();

      console.log(`Total objetos: ${objetosCarga.length}`);

      for (const plp of plps) {
        const response = await this.correioServices.solicitaXmlPlp(plp.plp, plp.etiqueta);
        if (!response) continue;
        plpsSync.push(response);
      }

      for (const objeto of objetosCarga) {
        const data = this.findObjectInPlp(objeto.etiqueta, plpsSync);
        const { objetoPostal } = data || {};

        if (!data) {
          this.objetosNaoLocalizados.push(objeto);
          continue;
        }

        if (+objetoPostal?.status_processamento === 2) {
          this.objetosErroProcessamento.push(objeto);
          continue;
        }

        if (objetoPostal.data_postagem_sara) {
          await this.cargaRepository.save(objeto, data);
          this.objetosOK.push(objeto);
          continue;
        }

        if (+objetoPostal?.status_processamento === 0) {
          this.objetosNaoPostados.push(objeto);
          continue;
        }

        console.log({ data });
      }

      console.log({
        objetosNaoLocalizados: this.objetosNaoLocalizados.length,
        objetosErroProcessamento: this.objetosErroProcessamento.length,
        objetosOK: this.objetosOK.length,
        objetosNaoPostados: this.objetosNaoPostados.length,
      });

      this.resetStatusResult();
    }
  }
}

export default LimpaGrid;
