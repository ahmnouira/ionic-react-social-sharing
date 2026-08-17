import { IonItem } from "@ionic/react";
import { ItemProps } from "@ahmnouira/props";
import { Post as PostType } from "../../models/post";
import { Post } from "../Post";

export function PostItem({ item: post }: ItemProps<PostType>) {
  return (
    <IonItem
      button={false}
      detail={false}
      key={post.id}
      routerLink={`/home/posts/${post.id}`}
    >
      <Post item={post} />
    </IonItem>
  );
}
