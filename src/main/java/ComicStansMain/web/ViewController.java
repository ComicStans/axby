package ComicStansMain.web;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping({"/", "/marketPlace", "/messageBoards", "/profile", "/about", "/friends","/login", "/register","/account", "/userProfile"})
    public String showView(){
        return "forward:/index.html";
    }

}