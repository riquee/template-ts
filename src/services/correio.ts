import { request } from '../utils/axios';
import { solicitaPlp } from '../utils/xml';
import { xmlToJson } from '../utils/xmlDecode';
import {
  ISolicitaXmlPlpJson,
  ISolicitaXmlPlpResponseJson,
  ISolicitaXmlPlpSerialized,
} from '../types/wsCorreio';
import { transformObjectRecursive } from '../utils/helpers';

class CorreioService {
  async solicitaXmlPlp(plp: string, etiqueta: string): Promise<ISolicitaXmlPlpSerialized> {
    try {
      const data = await request<string>({
        method: 'POST',
        url: process.env.WS_ATENDE_CLIENTE,
        data: `<?xml version="1.0" encoding="UTF-8"?>
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:cli="http://cliente.bean.master.sigep.bsb.correios.com.br/">
          <soapenv:Header />
          <soapenv:Body>
              <cli:solicitaXmlPlp>
                <idPlpMaster>${plp}</idPlpMaster>
                <usuario>EXITOINF</usuario>
                <senha>ndcz62</senha>
              </cli:solicitaXmlPlp>
          </soapenv:Body>
        </soapenv:Envelope>`,
        headers: { 'Content-Type': 'text/xml' },
      });

      const rsponseJson: ISolicitaXmlPlpResponseJson = await xmlToJson(data);
      const plpJson: ISolicitaXmlPlpJson = await xmlToJson(
        rsponseJson['soap:Envelope']['soap:Body'][0]['ns2:solicitaXmlPlpResponse'][0].return[0],
      );

      return transformObjectRecursive(plpJson);
    } catch (error) {
      return this.solicitaPlpComEtiqueta(plp, etiqueta)
    }
  }

  async solicitaPlpComEtiqueta(plp: string, etiqueta: string) {
    try {
      const data = await request<string>({
        method: 'POST',
        url: process.env.WS_ATENDE_CLIENTE,
        data: solicitaPlp(plp, etiqueta),
        headers: { 'Content-Type': 'text/xml' },
      });

      const rsponseJson: ISolicitaXmlPlpResponseJson = await xmlToJson(data);
      const plpJson: ISolicitaXmlPlpJson = await xmlToJson(
        rsponseJson['soap:Envelope']['soap:Body'][0]['ns2:solicitaPLPResponse'][0].return[0],
      );

      return transformObjectRecursive(plpJson);
    } catch (error) {
    }
  }
}

export default CorreioService;
