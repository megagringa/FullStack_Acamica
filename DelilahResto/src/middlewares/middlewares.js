const { validateTokenJWT } = require('./jwt');
const { db, Sequelize } = require('../../database');

function validateToken(req, res, next) {
    const auth = req.headers.authorization;

    if (auth) {
        const token = auth.split(' ')[1];
        const user = validateTokenJWT(token);
        if (user) {
            req.params.user = user;
            next();
        } else {
            res.status(401).json({ msg: 'Missing token or invalid' })
        }
    } else {
        res.status(401).json({ msg: 'Missing token or invalid' })
    }
}

function validateSigninParams(req, res, next) {
    const { user_mail, user_password } = req.body;
    if (user_mail && user_password) {
        next();
    } else {
        res.status(400).json({ error: "Invalidate params all parameters are necessary" });
    }
}

function validateRegisterParams(req, res, next) {
    const { user_name, user_lastname, user_mail, user_phone, user_password, user_address } = req.body;

    if (user_name && user_lastname && user_mail && user_phone && user_password && user_address) {
        next();
    } else {
        res.status(400).json({ error: "Invalidate params all parameters are necessary" });
    }
}

function validateRol(req, res, next) {
    const user = req.params.user;
    if (user.user_admin == 1) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized user to do this operation' });
    }
}

function validateUserId(req, res, next) {
    const { user, idUser } = req.params;

    if (user.user_admin == 0 && user.user_id == idUser) {
        next();
    } else {
        if (user.user_admin == 1) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized user to perform this operation, you cannot access the data of other users' });
        }
    }

}

function validateOnlyClients(req, res, next) {
    const user = req.params.user;
    if (user.user_admin == 0) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized user to do this operation' });
    }
}

function validateExistingUserId(req, res, next) {
    const userId = req.params.idUser;
    db.query('SELECT * FROM Users WHERE user_id = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [userId]
        })
        .then(result => {
            if (result.length != 0) {
                next();
            } else {
                res.status(404).json({ error: 'user not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

function validateSesionUser(req, res, next) {
    const user = req.params.user;
    db.query('SELECT * FROM Users WHERE user_id = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [user.user_id]
        })
        .then(result => {
            if (result[0].user_active != 0) {
                next();
            } else {
                res.status(401).json({ error: 'user is not logged in' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

function validateProductParams(req, res, next) {
    const { product_name, product_price, product_description } = req.body;

    if (product_name && product_price && product_description) {
        next();
    } else {
        res.status(400).json({ error: "Invalidate params all parameters are necessary" });
    }
}

function validateProductId(req, res, next) {
    const productId = req.params.idProduct;
    db.query('SELECT * FROM Products WHERE product_id = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [productId]
        })
        .then(result => {
            if (result.length != 0) {
                next();
            } else {
                res.status(404).json({ error: 'product not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

function validateOrderParams(req, res, next) {
    const { order_description, order_form_payment, order_total_price, order_products } = req.body;

    if (order_description && order_form_payment && order_total_price && order_products) {
        next();
    } else {
        res.status(400).json({ error: "Invalidate params all parameters are necessary" });
    }
}

function validateOrdersByRol(req, res, next) {
    const user = req.params.user;
    console.log(user);
    if (user.user_admin == 0) {
        db.query('SELECT * FROM Orders WHERE order_id_user = ?',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: [user.user_id]
            })
            .then(result => {
                req.params.orders = result;
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'internal error' });
            });
    } else {
        db.query('SELECT * FROM Orders',
            {
                type: Sequelize.QueryTypes.SELECT
            })
            .then(result => {
                req.params.orders = result;
                next();
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: 'internal error' });
            });
    }
}

function validateExistingOrderId(req, res, next) {

    const { user, idOrder } = req.params;

    db.query('SELECT * FROM Orders WHERE order_id = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [idOrder]
        })
        .then(result => {
            if (result.length != 0) {
                req.params.order = result;

                if (user.user_admin == 0 && result[0].order_id_user == user.user_id) {
                    next();
                } else {
                    if (user.user_admin == 1) {
                        next();
                    } else {
                        res.status(401).json({ error: 'Unauthorized user to perform this operation, you cannot access the data of other users' });
                    }
                }

            } else {
                res.status(404).json({ error: 'order not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

function validateOrderStateParams(req, res, next) {
    const { order_state } = req.body;

    if (order_state == 'new' || order_state == 'cooking' || order_state == 'confirmed' || order_state == 'sending' || order_state == 'canceled' || order_state == 'delivered') {
        next();
    } else {
        res.status(400).json({ error: "Invalidate params all parameters are necessary or parameter invalid" });
    }
}

function validateExistingOrder(req, res, next) {
    const orderId = req.params.idOrder;
    db.query('SELECT * FROM Orders WHERE order_id = ?',
        {
            type: Sequelize.QueryTypes.SELECT,
            replacements: [orderId]
        })
        .then(result => {
            if (result.length != 0) {
                next();
            } else {
                res.status(404).json({ error: 'order not found' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'internal error' });
        });
}

module.exports = {
    validateToken,
    validateSigninParams,
    validateRegisterParams,
    validateRol,
    validateUserId,
    validateOnlyClients,
    validateExistingUserId,
    validateSesionUser,
    validateProductParams,
    validateProductId,
    validateOrderParams,
    validateOrdersByRol,
    validateExistingOrderId,
    validateOrderStateParams,
    validateExistingOrder
}