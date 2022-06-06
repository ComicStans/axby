package ComicStansMain.web;


import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping(value = "api/search", headers = "Accept=application/json")
public class TwitchController {
    @Value("${client.id}")
    private String clientID;

    @Value("${twitchAuth}")
    private String twitchAuth;

    @GetMapping
    private ResponseEntity<String> getAll(@RequestParam String gameName){
        String str = "";
        CloseableHttpClient httpclient = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost("https://api.igdb.com/v4/games");
        httpPost.addHeader("Client-ID", clientID);
        httpPost.addHeader("Authorization", twitchAuth);

        StringEntity myEntity = new StringEntity("fields involved_companies.company.name, genres.name, themes.name, first_release_date, cover.url, name,platforms.name, rating, similar_games.name, summary, storyline;\n" +
                "limit 5;\n" +
                "search \"" + gameName +"\";", ContentType.create("text/plain", "UTF-8"));
        httpPost.setEntity(myEntity);
        try {
            CloseableHttpResponse response = httpclient.execute(httpPost);
            HttpEntity entity = response.getEntity();
            str = EntityUtils.toString(entity);
        }catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }finally {
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return new ResponseEntity<>(str, HttpStatus.OK);

    }
}
