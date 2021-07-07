import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel, IonButton } from '@ionic/react';
import { useEffect, useState } from 'react';
import { RouteComponentProps, useParams,   } from 'react-router';
import { posts } from '../../mocks/posts';
import { Post } from '../../models/post';

import './PostDetailsPage.css';


type ParamsType = {
  id: string
}

export const PostDetailsPage: React.FC<RouteComponentProps> = ({history, match}: RouteComponentProps) => {

  const params = useParams<ParamsType>()
  const [post, setPost] = useState<Post | undefined>(undefined)

 useEffect(() => {
    const post: Post | undefined  = posts.find((post)=> post.id.toString() === params.id)
    setPost(post)
 }, [params.id])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CardExamples</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
            <IonCardTitle>Card Title</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            {JSON.stringify(post)}
      </IonCardContent>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

