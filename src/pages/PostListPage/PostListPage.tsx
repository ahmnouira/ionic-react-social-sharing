import { Link, RouteComponentProps } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import './PostListPage.css';


export const PostListPage: React.FC<RouteComponentProps> = ({history}: RouteComponentProps) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Users</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem routerLink="/home/posts/1">
            <IonLabel>User 1</IonLabel>
          </IonItem>
          <IonItem>
            <Link to="/home/posts/2">
              <IonLabel>User 2</IonLabel>
            </Link>
          </IonItem>
          <IonItem>
            <IonButton onClick={e => {
              e.preventDefault();
              history.push('/home/posts/3')
            }}>
              <IonLabel>User 3</IonLabel>
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

