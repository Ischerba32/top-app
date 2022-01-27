import { GetStaticProps, GetServerSideProps } from "next";
import { Htag } from "../components/";
import { withLayout } from "../layout/Layout";
import axios from 'axios';
import { MenuItem } from "../interfaces/menu.interface";
import { API } from "../helpers/api";

function Home({menu}: HomeProps): JSX.Element {
  return (
    <>
      <Htag tag='h1'>Выберите курс в необходимой категории</Htag>
      <ul>
        {menu.map(m => {
          <li key={m._id.secondCategory}>{m._id.secondCategory} v </li>;
        })}
      </ul>
    </>
  );
}

export default withLayout(Home);

// export const getStaticProps: GetStaticProps<HomeProps> = async () => {
// 	const firstCategory = 0;
// 	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
//     firstCategory
//   });
// 	return {
// 		props: {
// 			menu,
// 			firstCategory
// 		}
// 	};
// };

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
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