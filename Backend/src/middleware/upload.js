import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // This assumes Backend/public/Images exists relative to Backend/src/middleware
    cb(null, path.join(__dirname, '../../public/Images'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
export default upload;