import { injectable } from "inversify";
import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';

interface EmailTemplateOptions {
    verificationCode: string;
    user: {
        username: string;
    };
}

@injectable()
class VerifyAccountEmailTemplate {
    public getTemplate(options: EmailTemplateOptions): string {
        const source = fs.readFileSync(
            path.join(
                __dirname,
                "../../../templates",
                "emails",
                "verify-account.handlebars",
            ),
            "utf8",
        );
        const template = Handlebars.compile(source);
        return template({ ...options, 
            deliLogo: "cid:deli_logo_light-1482dbe2.png", 
            deliInverse: "cid:deli_logo_color-666b50b0.png", 
            arrowIcon: "cid:arrow-icon.png" });
    }

    public getAttachments(): any[] {
        const deliHeader = path.join(__dirname, "../../../public", "deli_logo_light-1482dbe2.png");
    
        const deliInverse = path.join(__dirname, "../../../public", "deli_logo_color-666b50b0.png");

        const arrowIcon = path.join(__dirname, "../../../public", "arrow-icon.png");
        return [
            {
                filename: "deli_logo_light-1482dbe2.png",
                path: deliHeader,
                cid: "deli_logo_light-1482dbe2.png",
            },
            {
                filename: "deli_logo_color-666b50b0.png",
                path: deliInverse,
                cid: "deli_logo_color-666b50b0.png",
            },
            {
                filename: "arrow-icon.png",
                path: arrowIcon,
                cid: "arrow-icon.png",
            },
        ];
    }
}

export default VerifyAccountEmailTemplate;
