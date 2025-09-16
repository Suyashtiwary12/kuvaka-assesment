import Offer from '../models/offerModel.js';

export const uploadOffer = async (req, res) => {
    try {
        await Offer.deleteMany();
        const newOffer = new Offer(req.body);
        await newOffer.save();

        res.status(200).json({ message: 'Offer saved successfully', offer: newOffer });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save offer', error: error.message });
    }
};
