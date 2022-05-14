package ComicStansMain.dto;

import java.time.LocalDate;

public class UserGameListTransfer {
    private Long userId;
    private Long gameId;
    private String status;
    private String review;
    private LocalDate dateUpdated;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public LocalDate getDateUpdated() {
        return dateUpdated;
    }

    public void setDateUpdated(LocalDate dateUpdated) {
        this.dateUpdated = dateUpdated;
    }

    public UserGameListTransfer(Long userId, Long gameId, String status, String review, LocalDate dateUpdated) {
        this.userId = userId;
        this.gameId = gameId;
        this.status = status;
        this.review = review;
        this.dateUpdated = dateUpdated;


    }
}
