import React, { useEffect, useState } from 'react';
import default_image from '../../../assets/default_product.png';
import { useGetProductsDetailsQuery } from '../../../redux/api/productsApi';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loader from '../../Layout/Loader/Loader';
import StarRatings from 'react-star-ratings';

const ProductDetails = () => {
	const params = useParams();
	const { data, isLoading, isError, error } = useGetProductsDetailsQuery(
		params?.id
	);
	const product = data?.product;

	const [activeImage, setActiveImage] = useState('');
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		setActiveImage(product?.images?.[0]?.url || default_image);
	}, [product]);

	useEffect(() => {
		if (isError) {
			toast.error(error?.data?.message);
		}
	}, [isError, error]);

	const handleQuantityChange = (delta) => {
		setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1));
	};

	if (isLoading) return <Loader />;

	return (
		<div className='flex flex-col  gap-6 p-6 bg-gray-900 min-h-screen text-white'>
			<div className='flex flex-col md:flex-row gap-8'>
				{/* Thumbnail Images */}
				<div className='flex flex-col-reverse md:flex-row md:w-[50%]'>
					<div className='flex p-2 flex-row md:flex-col bg-gray-800 w-[20%]  gap-6 md:justify-center'>
						{product?.images?.map((img, index) => (
							<img
								className={`w-[100%] object-fill aspect-square rounded-md cursor-pointer border-2 ${
									img.url === activeImage
										? 'border-black'
										: 'border-gray-300'
								} hover:border-black`}
								key={index}
								src={img.url}
								alt={`Thumbnail ${index + 1}`}
								onClick={() => setActiveImage(img.url)}
							/>
						))}
					</div>

					{/* Main Image */}
					<div className='flex-1 flex items-center justify-center'>
						<img
							className='w-full max-w-lg  h-[80vh] md:h-auto object-fill rounded-lg shadow-lg'
							src={activeImage}
							alt={product?.name || 'Product Image'}
						/>
					</div>
				</div>

				{/* Product Details */}
				<div className='flex-1'>
					<h1 className='text-lg md:text-4xl font-bold mb-3'>
						{product?.name}
					</h1>
					<p className='mb-2'>Product ID: {product?._id}</p>
					<div className='flex items-center mb-3'>
						<StarRatings
							rating={product?.ratings || 0}
							starRatedColor='#ffb829'
							numberOfStars={5}
							name='rating'
							starDimension='24px'
							starSpacing='1px'
						/>
						<span className='ml-2'>
							({product?.number_of_reviews} Reviews)
						</span>
					</div>
					<p className='text-2xl font-semibold text-red-500 mb-4'>
						${product?.price}
					</p>

					{/* Quantity Selector */}
					<div className='flex items-center mb-4'>
						<button
							onClick={() => handleQuantityChange(-1)}
							className={`px-4 py-2 rounded-l text-lg ${
								quantity === 1
									? 'bg-gray-700 cursor-not-allowed'
									: 'bg-gray-500 hover:bg-gray-700'
							} text-white`}
							aria-label='Decrease Quantity'
						>
							-
						</button>
						<span className=' text-white px-5 py-2 text-lg'>
							{quantity}
						</span>
						<button
							onClick={() => handleQuantityChange(1)}
							className='bg-gray-500 text-white px-4 py-2 rounded-r text-lg hover:bg-gray-700'
							aria-label='Increase Quantity'
						>
							+
						</button>
					</div>

					<button
						type='button'
						className='bg-gray-700 text-white font-bold py-3 px-6 rounded hover:bg-gray-900 hover:border-white  transition duration-300 w-full md:w-auto mb-4'
					>
						Add to Cart
					</button>

					{/* Product Status */}
					<p className='mt-2'>
						Status:
						<span
							className={
								product?.stock > 0
									? 'text-green-500'
									: 'text-red-500'
							}
						>
							{product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
						</span>
					</p>

					{/* Description */}
					<h4 className='mt-4 text-lg font-semibold'>Description:</h4>
					<p className='mb-4'>{product?.description}</p>
					<p className='mb-3'>
						Sold by: <strong>{product?.seller}</strong>
					</p>
					<p className='mb-3'>
						Category:
						<strong> {product?.category.join(', ')}</strong>
					</p>
				</div>
			</div>

			{/* Customer Reviews */}
			<div className='mt-8'>
				<h2 className='text-2xl font-bold mb-4'>Customer Reviews</h2>
				{product?.reviews?.length ? (
					product.reviews.map((review, index) => (
						<div
							key={index}
							className='bg-gray-800 p-4 rounded-lg shadow-md mb-4 text-white'
						>
							<p className='text-lg mb-2'>
								<strong>{review.author}</strong>{' '}
								<span className='text-sm text-gray-400'>
									({review.date})
								</span>
							</p>
							<p className='mb-2'>{review.comment}</p>
							<div className='flex items-center'>
								<StarRatings
									rating={review.rating}
									starRatedColor='#ffb829'
									numberOfStars={5}
									name={`review-rating-${index}`}
									starDimension='20px'
									starSpacing='1px'
									readonly
								/>
								<span className='ml-2 text-sm'>
									({review.rating})
								</span>
							</div>
						</div>
					))
				) : (
					<p className='text-gray-400'>No reviews yet.</p>
				)}

				<div className='mt-6 text-center'>
					<p className='bg-gray-500 text-white py-2 px-4 rounded'>
						Login to post your review.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
