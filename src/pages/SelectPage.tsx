import AutoComplete from '../components/autoselect';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import axios from 'axios';
import Box from '@mui/material/Box';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';

type optionsProp = {
	label: string;
	value: string;
};

const difficult = [
	{
		label: 'hard',
		value: 'hard',
	},
	{ label: 'medium', value: 'medium' },
	{ label: 'easy', value: 'easy' },
];
const time = [
	{ label: '30s', value: '30' },
	{ label: '60s', value: '60' },
	{ label: '90s', value: '90' },
];
const type = [
	{ label: 'true / false', value: 'boolean' },
	{ label: 'multichoice', value: 'multichoice' },
];

const SelectPage = () => {
	const [categories, setCategories] = useState<optionsProp[]>([]);
	const { handleSubmit, control } = useForm({
		defaultValues: {
			category: categories,
			difficult,
			time,
			type,
		},
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	useEffect(() => {
		async function getToken() {
			const sessionToken = await axios.get(
				`${process.env.REACT_APP_QUIZ_APP_API}api_token.php?command=request`
			);

			localStorage.setItem('session_token', sessionToken.data.token);
		}

		getToken();
	}, []);

	useEffect(() => {
		async function getCategories() {
			const data = await axios.get(
				`${process.env.REACT_APP_QUIZ_APP_API}api_category.php`
			);

			setCategories(data.data.trivia_categories);
		}

		getCategories();
	}, []);

	return (
		<Grid
			container
			spacing={0}
			direction="column"
			alignItems="center"
			justifyContent="center"
			style={{ minHeight: '100vh' }}
		>
			<Grid item xs={12}>
				<Container maxWidth={'xs'}>
					<form
						onSubmit={handleSubmit((data: any) => onSubmit(data))}
					>
						<AutoComplete
							control={control}
							name="category"
							options={categories}
						/>
						<AutoComplete
							control={control}
							name="difficult"
							options={difficult}
						/>
						<AutoComplete
							control={control}
							name="type"
							options={type}
						/>
						<AutoComplete
							control={control}
							name="time"
							options={time}
						/>
						<TextField type="submit">Submit</TextField>
					</form>
				</Container>
			</Grid>
		</Grid>
	);
};

export default SelectPage;
