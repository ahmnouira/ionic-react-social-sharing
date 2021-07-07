import { IonCardTitle, IonCardContent, IonCard, IonCardHeader, IonCardSubtitle, IonButtons, IonBackButton, } from '@ionic/react';
import {Post as PostType} from '../../models/post'

type PostProps = {
  post: PostType
}

export const Post: React.FC<PostProps> = ({post}: PostProps) => {

  return (
    <IonCard>


        <img src={post.image} />

    <IonCardHeader>
      <IonCardTitle color='primary'>{post.category}</IonCardTitle>
      <IonCardTitle>{post.content}</IonCardTitle>
      <IonCardSubtitle>{post.author}</IonCardSubtitle>
    </IonCardHeader>

    <IonCardContent>
     {post.content}
</IonCardContent>
  </IonCard>
  )

}

