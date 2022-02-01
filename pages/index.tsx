import { GetServerSideProps } from "next";
import { Htag } from "../components/";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({menu, temp}: HomeProps): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Выберите курс в необходимой категории</Htag>
      <ul>
        {menu.map(m => {
          <li key={m._id.secondCategory}>{m._id.secondCategory} v </li>;
        })}
      </ul>
      <div dangerouslySetInnerHTML={{__html: temp }}></div>
    </>
  );
}

export default withLayout(Home);


export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });
  const temp =
      `
        <div>
          <h2>Component from server</h2>
        </div>
      `;
	return {
		props: {
			menu,
			firstCategory,
      temp,
		}
	};
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
  temp: string;
}