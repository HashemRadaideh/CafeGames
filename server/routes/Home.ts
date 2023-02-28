import express from "express";
const router = express.Router()

router.get('/', (res, req) => {
  console.log("Hello");
});

router.post('/', (res, req) => {
});

router.put('/', (res, req) => {
});

router.delete('/', (res, req) => {
});

module.exports = router;
