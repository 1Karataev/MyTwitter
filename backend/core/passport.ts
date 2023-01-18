import { UserModel, userModel} from "../models/UserModels";
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {Strategy as JWTstrategy, ExtractJwt} from 'passport-jwt';


passport.use(new LocalStrategy(async(username: string, password: string, done: any): Promise<void> => {
  try {
    const user = await userModel.findOne({$or: [{email: username}, {username}]}).exec() 

    if(!user){
      return done(null, false)
    } 
    ///добавить мд5 в пароль 
    if( user.password === password){
      return done(null, user)
    } else {
      return done(null, false)
    } 
  } catch (e) {
    done(e, false)
  
  }
  
}));

passport.serializeUser((user: any, done: any) => {
  done(null, user?._id)
});

passport.deserializeUser((id: any, done: any) => {
 userModel.findById(id, (err: any, user: any) =>{
  done(err, user)
 })
});

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromHeader('token')
    },
    async (payload: {data: UserModel}, done) => {
      try {
        const user = await userModel.findById(payload.data._id).exec()
        user ? done(null, user) : done(null, false)
      } catch (error) {
        done(error, false);
      }
    }
  )
);

export {passport};