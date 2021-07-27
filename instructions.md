
## ❯ API Routes

| Route                   | Description |
| ------------------------| ----------- |
| **/api/v1**             | Base path for version 1 Apis |
| **/graphql**            | Route to the graphql editor or your query/mutations requests |
| **/docs**               | This is the Swagger UI with our API documentation |
| **/monitor**            | Shows a small monitor page for the server |
| **/api/v1/auth**        | Authentication Related Routes |
| **/api/v1/auth/signup** | Signup Route |
| **/api/v1/auth/login**  | Login Route |
| **/api/user**           | User related Routes |



## ❯ PassportJS

PassportJS npm package is used for authentication;

Passport recognizes that each application has unique authentication requirements. Authentication mechanisms, known as strategies, are packaged as individual modules. Applications can choose which strategies to employ, without creating unnecessary dependencies.

Note:- Before asking Passport to authenticate a request, the strategy (or strategies) used by an application must be configured..

Two mandatory pieces need to be configured to use Passport for authentication:



Application middleware
    -> configured in src/server.ts
    -> app.express.use(passport.initialize());


Authentication strategies 
    -> configured in src/server.ts
    -> passport.use('jwt', jwtStrategy); 
    -> we are using jwt strategy
    -> strategy defined in src/config/passport.ts


Strategies require what is known as a verify callback. The purpose of a verify callback is to find the user that possesses a set of credentials.

When Passport authenticates a request, it parses the credentials contained in the request. It then invokes the verify callback with those credentials as arguments, in this case username and password. If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.


**Creating Strategy**

const env = new Environment();
  const secret = env.getSecret();
  const jwtOptions = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };
  return new Strategy(jwtOptions, jwtVerify);


   jwtVerify is the VerifyCallback 


-------- VerifyCallback Method ------

   const jwtVerify = async (payload, done: cb): Promise< void > => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await getUserById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);

  } catch (error) {
    done(error, false);
  }
  return null;
};


-> we will get the decoded token in payload
-> payload.sub is the userId because that is how we created the payload and signed it with our secret in generateToken Method to generate the Token- refer below code


----------- Token Generation  -------- 

const generateToken = (userId: ObjectID, expires: Date, type: string): string => {
  const env = new Environment();
  const payload = {
    sub: userId,
    iat: (Date.now() / 1000),
    exp: (expires.getTime() / 1000),
    type,
  };

  return jwt.sign(payload, env.getSecret());
};


**Protectig Routes with Passport**

--> we have created a middleware in src/middlewares/auth.middleware.ts named 'auth' for authentication
--> we will use that middleware to protect our routes
--> auth middleware used in /src/routes/v1/user.route.ts to protect /api/v1/user/getUser path

    this.router.get(`${this.path}getUser`, auth('getUsers'),
    catchAsync(this.userController.getUserList));

--> just pass the Roles required to Access that Route as comma seperated

Example - this.router.get(`${this.path}getUser`, auth('getUsers', 'manageUsers'),
          catchAsync(this.userController.getUserList));


 **Auth Middleware**
 --> passport.authenticate() method is used to authenticate Request

   passport.authenticate(
   strategy: string | string[] | passport.Strategy, 
   options: passport.AuthenticateOptions, 
   callback?: (...args: any[]
   ) => any): any

--> passport.authenticate() method takes 3 parameters 
 
    strategy
    options
    callback

--> callback will return the done() callback that we used in ** Creating Strategy VerifyCallback Method **
--> async (err, user, info) => {}
--> 1st parameter is error and in 2nd parameter we will get user information
--> we will get role from user.role
--> we are having user's role now we can process it furthur as per our requirements