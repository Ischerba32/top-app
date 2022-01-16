import { useState, useEffect } from "react";
import { Button, Htag, P, Rating, Tag } from "../components/";

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4);


  return (
    <>
      <Htag tag='h1'>Hello</Htag>
      <Button appearance='primary'>Button</Button>
      <Button appearance='ghost' arrow='right'>Button</Button>
      <P size="l">Large</P>
      <P size="m">Middle</P>
      <P size="s">small</P>
      <Tag size='s'>smal</Tag>
      <Tag size='m' color='red'>mid</Tag>
      <Tag size='s' color='green'>green</Tag>
      <Tag color='primary'>qwe</Tag>
      <Rating rating={rating} isEditable setRating={setRating}/>
    </>
  );
}
