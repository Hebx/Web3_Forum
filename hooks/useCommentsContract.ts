import * as wagmi from 'wagmi';
import {useProvider, useSigner} from 'wagmi';
import type { BigNumber  } from 'ethers';
import CommentsContract from '../artifacts/contracts/Comments.sol/Comments.json';

export interface Comment {
	id: string;
	topic: string;
	message: string;
	creator_address: string;
	created_at: BigNumber;
}
 export enum EventType {
	CommentAdded = "CommentAdded",
 }

 const useCommentsContract = () => {
	// an ethers.Signer instance associated with the signed-in wallet
	const [signer] = useSigner();
	// an ethers.Provider instance passed as a prop to the WagmiProvider
	const provider = useProvider();

	// This returns a new ethers.Contract ready to interact with our comments API
	// We need to pass in the address of our deployed contract as well as its abi.
	  // We also pass in the signer if there is a signed in wallet, or if there's
  	// no signed in wallet then we'll pass in the connected provider.
	const contract = wagmi.useContract({
		addressOrName: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
		contractInterface: CommentsContract.abi,
		signerOrProvider: signer.data || provider,
	});


	// Wrapper to add types to getComments functions
	const getComments = async (topic:string): Promise<Comment[]> => {
		return contract.getComments(topic).then((comments) => {
			// each comment is represented as array by default so we convert it to object
			return comments.map((c) => ({...c}));
		});
	};

	// Wrapper to add types to our addComment function
	const addComment = async (topic:string, message:string): Promise<void> => {
		// create a new transaction
		const tx = await contract.addComment(topic, message);
		// wait for the transaction to be mined
		await tx.wait();
	};

	return {
		contract,
		chainId: contract.provider.network?.chainId,
		getComments,
		addComment,
	};
 };

 export default useCommentsContract;
