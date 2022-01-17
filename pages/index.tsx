import { GetStaticProps } from "next";
import { useState, useEffect } from "react";
import { Button, Htag, P, Rating, Tag } from "../components/";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";


function Home({menu}: HomeProps): JSX.Element {
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
      <ul>
        {menu.map(m => {
          return (
            <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
          );
        })}
      </ul>
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>((process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find'), {
    firstCategory
  });
	return {
		props: {
			menu,
			firstCategory
		}
	};
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}