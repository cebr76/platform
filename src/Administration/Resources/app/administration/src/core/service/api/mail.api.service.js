import ApiService from '../api.service';

/**
 * Gateway for the API end point "mail"
 * @class
 * @extends ApiService
 */
class MailApiService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = 'mail-template') {
        super(httpClient, loginService, apiEndpoint);
        this.name = 'mailService';
    }

    testMailTemplate(recipient, mailTemplate, mailTemplateMedia, salesChannelId) {
        const apiRoute = `/_action/${this.getApiBasePath()}/send`;

        return this.httpClient.post(
            apiRoute,
            {
                contentHtml: mailTemplate.contentHtml,
                contentPlain: mailTemplate.contentPlain,
                recipients: { [recipient]: recipient },
                salesChannelId: salesChannelId,
                mediaIds: mailTemplateMedia.getIds(),
                subject: mailTemplate.subject,
                senderMail: mailTemplate.senderMail,
                senderName: mailTemplate.senderName,
                testMode: true
            },
            {
                headers: this.getBasicHeaders()
            }
        ).then((response) => {
            return ApiService.handleResponse(response);
        });
    }
}

export default MailApiService;
