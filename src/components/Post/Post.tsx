import {
  IonCardTitle,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
} from "@ionic/react";
import { Post as PostType } from "../../models/post";
import { ItemProps } from "@ahmnouira/props";

type PostProps = ItemProps<PostType> & {};

export const Post: React.FC<PostProps> = ({ item: post }: PostProps) => {
  return (
    <IonCard>
      <img src={post.image} />
      <IonCardHeader>
        <IonCardTitle color="primary">{post.category}</IonCardTitle>
        <IonCardTitle>{post.content}</IonCardTitle>
        <IonCardSubtitle>{post.author}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{post.content}</IonCardContent>
    </IonCard>
  );
};
