namespace Models.Domain.Events
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Headline { get; set; }
        public string Description { get; set; }
        public string Summary { get; set; }
        public string Slug { get; set; }
        public int StatusId { get; set; }
        public int UserId { get; set; }
        public Image PrimaryImage { get; set; }
        public DateTime DateStart { get; set; }
        public DateTime DateEnd { get; set; }
        public string Address { get; set; }
        public string ZipCode { get; set; }
        public decimal Latitude { get; set; }
        public decimal Longitude { get; set; }
        public DateTime DateModified { get; set; }
        public DateTime DateCreated { get; set; }


    }
}
