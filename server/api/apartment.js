require("dotenv").config();

const express = require("express");
const multer = require('multer');
const { SpheronClient, ProtocolEnum } = require("@spheron/storage");
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;

  const client = new SpheronClient({ token: process.env.SPHERON_TOKEN });
  let currentlyUploaded = 0;
  const { uploadId, bucketId, protocolLink, dynamicLinks } = await client.upload(
    filePath,
    {
      protocol: ProtocolEnum.IPFS,
      name: "test",
      onUploadInitiated: (uploadId) => {
        console.log(`Upload with id ${uploadId} started...`);
      },
      onChunkUploaded: (uploadedSize, totalSize) => {
        currentlyUploaded += uploadedSize;
        console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
      },
    }
  );

  res.send({
    uploadId, bucketId, protocolLink, dynamicLinks
  });
})

module.exports = router;