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
public class StoryRepository {

    private final JdbcTemplate jdbc;

    public StoryRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Story> findAll() {
        String sql = "SELECT id, title_id, title, description, author_id, status, created_at, updated_at, featured, cover_url FROM stories ORDER BY id";
        try {
            return jdbc.query(sql, new RowMapper<Story>() {
                @Override
                public Story mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Story s = new Story();
                    s.setId(rs.getLong("id"));
                    s.setTitleId(rs.getString("title_id"));
                    s.setTitle(rs.getString("title"));
                    s.setDescription(rs.getString("description"));
                    s.setAuthorId(rs.getString("author_id"));
                    s.setStatus(rs.getString("status"));
                    s.setCreatedAt(rs.getTimestamp("created_at"));
                    s.setUpdatedAt(rs.getTimestamp("updated_at"));
                    s.setFeatured(rs.getString("featured"));
                    s.setCoverUrl(rs.getString("cover_url"));
                    return s;
                }
            });
        } catch (DataAccessException ex) {
            return List.of();
        }
    }

    public Optional<Story> findByTitleId(String titleId) {
        String sql = "SELECT id, title_id, title, description, author_id, status, created_at, updated_at, featured, cover_url FROM stories WHERE title_id = ? ORDER BY id LIMIT 1";
        try {
            List<Story> stories = jdbc.query(sql, new Object[]{titleId}, new RowMapper<Story>() {
                @Override
                public Story mapRow(ResultSet rs, int rowNum) throws SQLException {
                    Story s = new Story();
                    s.setId(rs.getLong("id"));
                    s.setTitleId(rs.getString("title_id"));
                    s.setTitle(rs.getString("title"));
                    s.setDescription(rs.getString("description"));
                    s.setAuthorId(rs.getString("author_id"));
                    s.setStatus(rs.getString("status"));
                    s.setCreatedAt(rs.getTimestamp("created_at"));
                    s.setUpdatedAt(rs.getTimestamp("updated_at"));
                    s.setFeatured(rs.getString("featured"));
                    s.setCoverUrl(rs.getString("cover_url"));
                    return s;
                }
            });
            return stories.stream().findFirst();
        } catch (DataAccessException ex) {
            return Optional.empty();
        }
    }
}
