const freeze = Object.freeze({
    JWT_SECRET : "tikisecret",
    SECRET_REFRESH: "tikisecretrefreshsecret",
    tokenLife: 5,
    refreshTokenLife: '12h'
})
export default freeze;
