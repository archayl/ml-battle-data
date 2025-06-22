import useSWR from "swr";

type Fetcher = <T = any>(args: [string, RequestInit?]) => Promise<T>;

const fetcher: Fetcher = ([url, options]) => fetch(url, options).then((r) => r.json());

export default function MatchTable({ matchId }: { matchId: string; }) {

	const proxyUrl = 'http://localhost:8080/'
	const url = proxyUrl + 'https://sg-api.mobilelegends.com/matchTools/v1/getMatchUrl?matchId=' + matchId;
	const options = {
		method: 'GET',
		headers: {
			accept: 'application/json, text/plain, */*',
			'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
			'cache-control': 'no-cache',
			origin: 'https://play.mobilelegends.com',
			pragma: 'no-cache',
			priority: 'u=1, i',
			referer: 'https://play.mobilelegends.com/',
			'sec-ch-ua': 'Chromium',
			'sec-ch-ua-mobile': '?0',
			'sec-ch-ua-platform': 'macOS',
			'sec-fetch-dest': 'empty',
			'sec-fetch-mode': 'cors',
			'sec-fetch-site': 'same-site',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
			'x-appid': '2636539',
			'x-lang': 'en'
		}
	};

	const shouldFetch = Boolean(matchId);
	const { data, error, isLoading } = useSWR(
		shouldFetch ? [url, options] : null,
		fetcher
	);

	if (error) return <div>Error: {error.message}</div>
	if (isLoading) return <div>Loading...</div>

	console.log(data);
	const player_list = data.data.battleData.player_list;

	return (
		<div>
			<table>
				<thead>
					<tr>
						<th>Team</th>
						<th>Player Name</th>
						<th>Kill</th>
						<th>Death</th>
						<th>Assist</th>
						<th>Gold</th>
					</tr>
				</thead>
				<tbody>
					{player_list.map((player: any) => {
						if (player.max_level != 0) {
							return <tr key={player.name}>
								<td>{player.camp}</td>
								<td>{player.name}</td>
								<td>{player.kill_num}</td>
								<td>{player.dead_num}</td>
								<td>{player.assist_num}</td>
								<td>{player.gold_total}</td>
							</tr>
						}
					})}
				</tbody>
			</table>
		</div >
	)
}
