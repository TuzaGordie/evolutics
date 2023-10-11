import {Pipe, PipeTransform} from '@angular/core';

// this pipe takes in one of the following social media names and returns url of the logo.
// if the input is not one of these, it returns empty string by default
@Pipe({
    name: 'socialMediaLogo'
})
export class SocialMediaLogo implements PipeTransform{
    transform(platform: string): string {
        switch (platform){
            case 'FACEBOOK': return '../../../../assets/img/facebook.png';
            case 'TWITTER': return '../../../../assets/img/twitter.png';
            case 'LINKEDIN': return '../../../../assets/img/linkedin.png';
            case 'INSTAGRAM': return '../../../../assets/img/instagram.png';
            case 'WHATSAPP': return '../../../../assets/img/whatsapp.png';
            case 'YOUTUBE': return '../../../../assets/img/youtube.png';
            default: return '../../../../assets/img/evolutics_logo.png';
        }
    }
}