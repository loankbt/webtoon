package com.example.demo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ChapterImageRepository {

    private final JdbcTemplate jdbc;

    public ChapterImageRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<ChapterImage> findByChapterId(Long chapterId) {
        String sql = "SELECT id, chapter_id, page_number, file_path, caption, created_at, updated_at FROM images WHERE chapter_id = ? ORDER BY page_number";
        return jdbc.query(sql, new Object[]{chapterId}, new RowMapper<ChapterImage>() {
            @Override
            public ChapterImage mapRow(ResultSet rs, int rowNum) throws SQLException {
                ChapterImage image = new ChapterImage();
                image.setId(rs.getLong("id"));
                image.setChapterId(rs.getLong("chapter_id"));
                image.setPageNumber(rs.getInt("page_number"));
                image.setFilePath(rs.getString("file_path"));
                image.setCaption(rs.getString("caption"));
                image.setCreatedAt(rs.getTimestamp("created_at"));
                image.setUpdatedAt(rs.getTimestamp("updated_at"));
                return image;
            }
        });
    }
}
