export default function Equipment({ list }: { list: number[] }) {

	return (
		<ul>
			{list.map((id: number) => {
				return (<li key={id}>{id}</li>)
			})
			}
		</ul>
	)
}
