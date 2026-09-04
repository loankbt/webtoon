package com.example.demo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ChapterRepository {

    private final JdbcTemplate jdbc;

    public ChapterRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Chapter> findByStoryId(Long storyId) {
        String sql = "SELECT id, story_id, chapter_number, title, release_date, created_at, updated_at FROM chapters WHERE story_id = ? ORDER BY chapter_number";
        return jdbc.query(sql, new Object[]{storyId}, new RowMapper<Chapter>(){
            @Override
            public Chapter mapRow(ResultSet rs, int rowNum) throws SQLException {
                Chapter c = new Chapter();
                c.setId(rs.getLong("id"));
                c.setStoryId(rs.getLong("story_id"));
                c.setChapterNumber(rs.getInt("chapter_number"));
                c.setTitle(rs.getString("title"));
                c.setReleaseDate(rs.getDate("release_date"));
                c.setCreatedAt(rs.getTimestamp("created_at"));
                c.setUpdatedAt(rs.getTimestamp("updated_at"));
                return c;
            }
        });
    }

    public Optional<Chapter> findChapterByTitleIdAndChapterNumber(String titleId, String chapterNumber) {
        String sql = "SELECT c.id, c.story_id, c.chapter_number, c.title, c.release_date, c.created_at, c.updated_at " +
                    "FROM chapters c " +
                    "JOIN stories s ON c.story_id = s.id " +
                    "WHERE s.title_id = ? AND c.chapter_number = ? " +
                    "ORDER BY c.chapter_number LIMIT 1";
        try {
            return Optional.of(jdbc.queryForObject(sql, new Object[]{titleId, chapterNumber}, new RowMapper<Chapter>() {
            @Override
            public Chapter mapRow(ResultSet rs, int rowNum) throws SQLException {
                Chapter c = new Chapter();
                c.setId(rs.getLong("id"));
                c.setStoryId(rs.getLong("story_id"));
                c.setChapterNumber(rs.getInt("chapter_number"));
                c.setTitle(rs.getString("title"));
                c.setReleaseDate(rs.getDate("release_date"));
                c.setCreatedAt(rs.getTimestamp("created_at"));
                c.setUpdatedAt(rs.getTimestamp("updated_at"));
                return c;
            }
        }
        ));
        } catch (DataAccessException ex) {
            return Optional.empty();
        }
    }
}
