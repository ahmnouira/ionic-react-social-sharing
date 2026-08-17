import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
} from "@ionic/react";
import { posts } from "../../mocks/posts";
import "./PostListPage.css";
import { PostItem } from "../../components/PostItem";

export function PostListPage({}) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SocialSharing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {posts.map((p, idx) => (
            <PostItem key={idx} item={p} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}
