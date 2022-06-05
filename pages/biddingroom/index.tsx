/** @format */

import { GetServerSideProps, NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
export interface bids {
	user: string;
	room: string;
	myBid: string;
	date: number;
}
const BiddingRoom: NextPage<biddingRoomProps> = (props) => {
	const { name, room } = props;
	const [activeRoom, setActiveRoom] = useState<string>();
	const [myName, setMyName] = useState<string>();
	const [bids, setBids] = useState<bids[]>([]);
	const [myBid, setMyBid] = useState<string>();
	const host: string = "http://localhost:4000/bid";
	const socket = io(host, {
		extraHeaders: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3MWE5MDcyNS02ZTFkLTRhZjctODdmMC1iNTkzOGMxNmI4NDIiLCJlbWFpbCI6Imxva2kxMjNAZ21haWwuY29tIiwiaWF0IjoxNjUxNDIxMjc2LCJleHAiOjE2NTE0MjQ4NzZ9.21D5Db-Df0FA3JqlWFY861Eqskq3Lvke7n3voZxU8SI`,
		},
	});

	useEffect(() => {
		setActiveRoom(room);
		setMyName(name);
		socket.emit("joinBiddingRoom", room);

		return () => {
			socket.emit("disconnected", name);

			socket.off();
		};
	}, [window.location.search]);

	useEffect(() => {
		socket.on("receive_message", (bid: bids) => {
			setBids((bids) => [...bids, bid]);
		});
	}, [socket]);

	return (
		<div>
			Welcome {myName} this is the {activeRoom}
			<p>Bids</p>
			<section>
				{bids
					.sort((a, b) => a.date - b.date)
					.map((message) => {
						let stringDate = message.date.toLocaleString();
						let localetime = stringDate.slice(0, -1);
						let date = new Date(localetime);

						return (
							<div
								className={`${
									message.user === myName ? "text-right" : "text-left"
								}`}>
								<p>{message.user}</p>
								<p>{message.myBid}</p>
								<p className='text-xs font-light text-gray-600'>
									{date.toUTCString()}
								</p>
							</div>
						);
					})}
			</section>
			<input
				className='mt-5'
				onChange={(e) => {
					e.preventDefault();
					setMyBid(e.target.value);
				}}></input>
			<button
				onClick={(e) => {
					e.preventDefault();
					console.log({
						user: myName,
						myBid: myBid,
						room: activeRoom,
						date: new Date(Date.now()),
					});

					socket.emit(
						"message",
						{
							user: myName,
							myBid: myBid,
							room: activeRoom,
							date: new Date(Date.now()),
						},
						(data: any) => {
							console.log(data);
						}
					);
				}}>
				Send
			</button>
		</div>
	);
};

// async function getServerSideProps= ({params}) =>  {

// }

export interface biddingRoomProps {
	name: string;
	room: string;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { name, room } = query;
	console.log(name, room);

	return {
		props: { room, name },
	};
};

export default BiddingRoom;
