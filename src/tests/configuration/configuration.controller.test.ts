import { Request, Response, NextFunction } from 'express';
import { emailTransporter } from '../../components/config/email.config';
import { sendConfiguration } from '../../components/configuration/configuration.controller';
import { testHelpers } from '../__mocks__/test-helpers';

describe('Configuration Controller', () => {
  let req: Request;
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    req = testHelpers.mockReq();
    res = testHelpers.mockRes();
    next = testHelpers.mockNext();
  });

  afterEach(() => {
    testHelpers.resetAll();
  });

  describe('sendConfiguration', () => {
    it('should send an email', async () => {
      req.params = { id: '1' };
      const sendMailSpy = jest.spyOn(emailTransporter, 'sendMail').mockImplementation();

      await sendConfiguration(req, res, next);

      expect(sendMailSpy).toHaveBeenCalledWith({
        from: 'contact@example.com',
        to: 'contact@example.com',
        subject: 'Demande de devis',
        html: `<p>Veuillez cliquer <a href="http://example:3000/configuration/1">ici</a> pour consulter le détail de la configuration.</p>`,
      });
      expect(res.send).toHaveBeenCalledWith({ message: 'Configuration sent', success: true });
    });
  });
});
