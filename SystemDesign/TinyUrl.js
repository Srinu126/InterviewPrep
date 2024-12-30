/**
 * Design a URL shortening service that:
 * Generates a unique, short URL for every long URL
 */
class TinyUrl {
        constructor(){
            this.urlMap = new Map();
            this.reverseMap = new Map();
            this.baseUrl = 'https://www.tinyurl.com/';
            this.counter = 0;
        }
        encode(longUrl){
            if(this.reverseMap.has(longUrl)){
                return this.reverseMap.get(longUrl);
            }
            let shortUrl = this.baseUrl + this.counter.toString(30);
            this.reverseMap.set(longUrl, shortUrl);
            this.urlMap.set(shortUrl, longUrl);
            this.counter++;
            return shortUrl;
        }
        decode(shortUrl){
            return this.urlMap.get(shortUrl) || null
    
        }
    }
    
    const tiny = new TinyUrl();
    let shortUrl = tiny.encode("https://www.linkedin.com/in/srinurachakonda");
    console.log(shortUrl);
    console.log(tiny.decode(shortUrl));