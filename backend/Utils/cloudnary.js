import cloudnary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: 'backend/config/config.env' });

cloudnary.v2.config({
	cloud_name: process.env.CLOUDNARY_CLOUD_NAME,
	api_key: process.env.CLOUDNARY_API_KEY,
	api_secret: process.env.CLOUDNARY_API_SECRET,
});

// CLOUDNARY UPLOAD AVATAR IMAGE FILE

export const upload_user_avatar_file = (file, folder) => {
	console.log('IN upload_user_avatar_file');

	return new Promise((resolve, reject) => {
		cloudnary.v2.uploader.upload(
			file,
			(result, error) => {
				resolve({
					public_id: result.public_id,
					url: result.url,
				});
				reject(console.log(error));
			},
			{
				resource_type: 'auto',
				folder,
			}
		);
	});
};

// CLOUDINARY FILE DELETE

export const delete_user_avatar_file = async (file) => {
	const res = await cloudnary.v2.uploader.destroy(file);

	if (res.result === 'ok') {
		return true;
	}
};
