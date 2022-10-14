const freeze = Object.freeze({
    JWT_SECRET : "tikisecret",
    SECRET_REFRESH: "tikisecretrefreshsecret",
    tokenLife: 2,
    refreshTokenLife: 120
})
export default freeze;