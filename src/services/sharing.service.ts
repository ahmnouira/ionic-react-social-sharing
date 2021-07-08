import {SocialSharing} from '@ionic-native/social-sharing'

export async function share (title: string, file: string, url: string): Promise<any>  {
   
   try {
   return await SocialSharing.share('SocialSharingApp', title, file, url)
   } catch  (error) {
    console.error(error)
   }
}