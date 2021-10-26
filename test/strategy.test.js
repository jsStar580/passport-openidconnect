var Strategy = require('../lib/strategy')
  , chai = require('chai')
  , uri = require('url')
  , qs = require('querystring');

describe('strategy', function() {

  describe('configured to work with a specific OpenID provider', function() {

    describe('issuing authorization request', function() {

      it('that redirects to identity provider without redirect URI', function(done) {
        var strategy = new Strategy({
          issuer: 'https://www.example.com',
          authorizationURL: 'https://www.example.com/oauth2/authorize',
          tokenURL: 'https://www.example.com/oauth2/token',
          clientID: 'ABC123',
          clientSecret: 'secret'
        }, function() {});
        
        chai.passport.use(strategy)
          .request(function(req) {
            req.session = {};
          })
          .redirect(function(url) {
            var pu = uri.parse(url, true);
            
            expect(url).to.equal('https://www.example.com/oauth2/authorize?response_type=code&client_id=ABC123&scope=openid&state=' + encodeURIComponent(pu.query.state));
          
            expect(this.session['openidconnect:www.example.com'].state.handle).to.have.length(24);
            expect(this.session['openidconnect:www.example.com'].state.handle).to.equal(pu.query.state);

            expect(this.session['openidconnect:www.example.com'].state.authorizationURL).to.equal('https://www.example.com/oauth2/authorize');
            expect(this.session['openidconnect:www.example.com'].state.tokenURL).to.equal('https://www.example.com/oauth2/token');
            expect(this.session['openidconnect:www.example.com'].state.clientID).to.equal('ABC123');
            expect(this.session['openidconnect:www.example.com'].state.clientSecret).to.equal('secret');
            expect(this.session['openidconnect:www.example.com'].state.params.response_type).to.equal('code');
          
            done();
          })
          .error(done)
          .authenticate();
      }); // that redirects to identity provider without redirect URI
      
      it('that redirects to identity provider with redirect URI', function(done) {
        var strategy = new Strategy({
          issuer: 'https://www.example.com',
          authorizationURL: 'https://www.example.com/oauth2/authorize',
          tokenURL: 'https://www.example.com/oauth2/token',
          clientID: 'ABC123',
          clientSecret: 'secret',
          callbackURL: 'https://www.example.net/login/return',
        }, function() {});
      
      
        chai.passport.use(strategy)
          .request(function(req) {
            req.session = {};
          })
          .redirect(function(url) {
            var pu = uri.parse(url, true);
            
            expect(url).to.equal('https://www.example.com/oauth2/authorize?response_type=code&client_id=ABC123&redirect_uri=https%3A%2F%2Fwww.example.net%2Flogin%2Freturn&scope=openid&state=' + encodeURIComponent(pu.query.state));
            
            expect(this.session['openidconnect:www.example.com'].state.handle).to.have.length(24);
            expect(this.session['openidconnect:www.example.com'].state.handle).to.equal(pu.query.state);

            expect(this.session['openidconnect:www.example.com'].state.authorizationURL).to.equal('https://www.example.com/oauth2/authorize');
            expect(this.session['openidconnect:www.example.com'].state.tokenURL).to.equal('https://www.example.com/oauth2/token');
            expect(this.session['openidconnect:www.example.com'].state.clientID).to.equal('ABC123');
            expect(this.session['openidconnect:www.example.com'].state.clientSecret).to.equal('secret');
            expect(this.session['openidconnect:www.example.com'].state.params.response_type).to.equal('code');
            
            done();
          })
          .error(done)
          .authenticate();
      }); // that redirects to identity provider with redirect URI
      
      it('that redirects to identity provider with redirect URI and scope', function(done) {
        var strategy = new Strategy({
          issuer: 'https://www.example.com',
          authorizationURL: 'https://www.example.com/oauth2/authorize',
          tokenURL: 'https://www.example.com/oauth2/token',
          clientID: 'ABC123',
          clientSecret: 'secret',
          callbackURL: 'https://www.example.net/login/return',
          scope: 'email'
        }, function() {});
      
      
        chai.passport.use(strategy)
          .redirect(function(url) {
            var pu = uri.parse(url, true);
            
            expect(url).to.equal('https://www.example.com/oauth2/authorize?response_type=code&client_id=ABC123&redirect_uri=https%3A%2F%2Fwww.example.net%2Flogin%2Freturn&scope=openid%20email&state=' + encodeURIComponent(pu.query.state));
            
            expect(this.session['openidconnect:www.example.com'].state.handle).to.have.length(24);
            expect(this.session['openidconnect:www.example.com'].state.handle).to.equal(pu.query.state);

            expect(this.session['openidconnect:www.example.com'].state.authorizationURL).to.equal('https://www.example.com/oauth2/authorize');
            expect(this.session['openidconnect:www.example.com'].state.tokenURL).to.equal('https://www.example.com/oauth2/token');
            expect(this.session['openidconnect:www.example.com'].state.clientID).to.equal('ABC123');
            expect(this.session['openidconnect:www.example.com'].state.clientSecret).to.equal('secret');
            expect(this.session['openidconnect:www.example.com'].state.params.response_type).to.equal('code');
            
            done();
          })
          .request(function(req) {
            req.session = {};
          })
          .error(done)
          .authenticate();
      }); // that redirects to identity provider with redirect URI and scope
      
      it('that redirects to identity provider with scope option', function(done) {
        var strategy = new Strategy({
          issuer: 'https://www.example.com',
          authorizationURL: 'https://www.example.com/oauth2/authorize',
          tokenURL: 'https://www.example.com/oauth2/token',
          clientID: 'ABC123',
          clientSecret: 'secret',
          callbackURL: 'https://www.example.net/login/return'
        }, function() {});
      
      
        chai.passport.use(strategy)
          .redirect(function(url) {
            var pu = uri.parse(url, true);
            
            expect(url).to.equal('https://www.example.com/oauth2/authorize?response_type=code&client_id=ABC123&redirect_uri=https%3A%2F%2Fwww.example.net%2Flogin%2Freturn&scope=openid%20email&state=' + encodeURIComponent(pu.query.state));
            
            expect(this.session['openidconnect:www.example.com'].state.handle).to.have.length(24);
            expect(this.session['openidconnect:www.example.com'].state.handle).to.equal(pu.query.state);

            expect(this.session['openidconnect:www.example.com'].state.authorizationURL).to.equal('https://www.example.com/oauth2/authorize');
            expect(this.session['openidconnect:www.example.com'].state.tokenURL).to.equal('https://www.example.com/oauth2/token');
            expect(this.session['openidconnect:www.example.com'].state.clientID).to.equal('ABC123');
            expect(this.session['openidconnect:www.example.com'].state.clientSecret).to.equal('secret');
            expect(this.session['openidconnect:www.example.com'].state.params.response_type).to.equal('code');
            
            done();
          })
          .request(function(req) {
            req.session = {};
          })
          .error(done)
          .authenticate({ scope: 'email' });
      }); // that redirects to identity provider with scope option
      
      it('that redirects to identity provider with scope option as array', function(done) {
        var strategy = new Strategy({
          issuer: 'https://www.example.com',
          authorizationURL: 'https://www.example.com/oauth2/authorize',
          tokenURL: 'https://www.example.com/oauth2/token',
          clientID: 'ABC123',
          clientSecret: 'secret',
          callbackURL: 'https://www.example.net/login/return'
        }, function() {});
      
      
        chai.passport.use(strategy)
          .redirect(function(url) {
            var pu = uri.parse(url, true);
            
            expect(url).to.equal('https://www.example.com/oauth2/authorize?response_type=code&client_id=ABC123&redirect_uri=https%3A%2F%2Fwww.example.net%2Flogin%2Freturn&scope=openid%20address%20phone&state=' + encodeURIComponent(pu.query.state));
            
            expect(this.session['openidconnect:www.example.com'].state.handle).to.have.length(24);
            expect(this.session['openidconnect:www.example.com'].state.handle).to.equal(pu.query.state);

            expect(this.session['openidconnect:www.example.com'].state.authorizationURL).to.equal('https://www.example.com/oauth2/authorize');
            expect(this.session['openidconnect:www.example.com'].state.tokenURL).to.equal('https://www.example.com/oauth2/token');
            expect(this.session['openidconnect:www.example.com'].state.clientID).to.equal('ABC123');
            expect(this.session['openidconnect:www.example.com'].state.clientSecret).to.equal('secret');
            expect(this.session['openidconnect:www.example.com'].state.params.response_type).to.equal('code');
            
            done();
          })
          .request(function(req) {
            req.session = {};
          })
          .error(done)
          .authenticate({ scope: [ 'address', 'phone' ] });
      }); // that redirects to identity provider with scope option as array
      
      it('that redirects to identity provider with redirect URI option', function(done) {
        var strategy = new Strategy({
          issuer: 'https://www.example.com',
          authorizationURL: 'https://www.example.com/oauth2/authorize',
          tokenURL: 'https://www.example.com/oauth2/token',
          clientID: 'ABC123',
          clientSecret: 'secret',
          callbackURL: 'https://www.example.net/login/return'
        }, function() {});
      
      
        chai.passport.use(strategy)
          .redirect(function(url) {
            var pu = uri.parse(url, true);
            
            expect(url).to.equal('https://www.example.com/oauth2/authorize?response_type=code&client_id=ABC123&redirect_uri=https%3A%2F%2Fwww.example.net%2Foidc%2Freturn&scope=openid&state=' + encodeURIComponent(pu.query.state));
            
            expect(this.session['openidconnect:www.example.com'].state.handle).to.have.length(24);
            expect(this.session['openidconnect:www.example.com'].state.handle).to.equal(pu.query.state);

            expect(this.session['openidconnect:www.example.com'].state.authorizationURL).to.equal('https://www.example.com/oauth2/authorize');
            expect(this.session['openidconnect:www.example.com'].state.tokenURL).to.equal('https://www.example.com/oauth2/token');
            expect(this.session['openidconnect:www.example.com'].state.clientID).to.equal('ABC123');
            expect(this.session['openidconnect:www.example.com'].state.clientSecret).to.equal('secret');
            expect(this.session['openidconnect:www.example.com'].state.params.response_type).to.equal('code');
            
            done();
          })
          .request(function(req) {
            req.session = {};
          })
          .error(done)
          .authenticate({ callbackURL: 'https://www.example.net/oidc/return' });
      }); // that redirects to identity provider with redirect URI option
      
      it('that redirects to identity provider with relative redirect URI option', function(done) {
        var strategy = new Strategy({
          issuer: 'https://www.example.com',
          authorizationURL: 'https://www.example.com/oauth2/authorize',
          tokenURL: 'https://www.example.com/oauth2/token',
          clientID: 'ABC123',
          clientSecret: 'secret',
          callbackURL: 'https://www.example.net/login/return'
        }, function() {});
      
  
        chai.passport.use(strategy)
          .redirect(function(url) {
            var pu = uri.parse(url, true);
            
            expect(url).to.equal('https://www.example.com/oauth2/authorize?response_type=code&client_id=ABC123&redirect_uri=https%3A%2F%2Fwww.example.net%2Fopenid-connect%2Freturn&scope=openid&state=' + encodeURIComponent(pu.query.state));
            
            expect(this.session['openidconnect:www.example.com'].state.handle).to.have.length(24);
            expect(this.session['openidconnect:www.example.com'].state.handle).to.equal(pu.query.state);

            expect(this.session['openidconnect:www.example.com'].state.authorizationURL).to.equal('https://www.example.com/oauth2/authorize');
            expect(this.session['openidconnect:www.example.com'].state.tokenURL).to.equal('https://www.example.com/oauth2/token');
            expect(this.session['openidconnect:www.example.com'].state.clientID).to.equal('ABC123');
            expect(this.session['openidconnect:www.example.com'].state.clientSecret).to.equal('secret');
            expect(this.session['openidconnect:www.example.com'].state.params.response_type).to.equal('code');
            
            done();
          })
          .request(function(req) {
            req.url = '/login/openid';
            req.headers.host = 'www.example.net';
            req.connection = { encrypted: true };
            req.session = {};
          })
          .error(done)
          .authenticate({ callbackURL: '/openid-connect/return' });
      }); // that redirects to identity provider with relative redirect URI option
  
    }); // issuing authorization request
    
  }); // configured to work with a known OpenID provider
  
}); // Strategy
