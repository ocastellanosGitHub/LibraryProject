using System;
using System;
using Microsoft.EntityFrameworkCore;
using LibraryStore.Data.Entities;

namespace LibraryStore.Data
{
    public class LibraryContext : DbContext
    {
        public LibraryContext(DbContextOptions<LibraryContext> options) : base(options) { }

        public DbSet<LibraryEntity> Libraries { get; set; } = null!;
        public DbSet<BookEntity> Books { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LibraryEntity>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.Name).IsRequired();
                b.HasMany(x => x.Books).WithOne(x => x.Library).HasForeignKey(x => x.LibraryId);
            });

            modelBuilder.Entity<BookEntity>(b =>
            {
                b.HasKey(x => x.Id);
                b.Property(x => x.Title).IsRequired();
                b.Property(x => x.Author).IsRequired();
                b.Property(x => x.Isbn).IsRequired();
            });
        }
    }
}