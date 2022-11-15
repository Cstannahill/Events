namespace Services.Interfaces
{
    public interface IEventService
    {
        public Paged<Event> Pagination(int pageIndex, int pageSize);
        public Paged<Event> SearchPaginated(int pageIndex, int pageSize, DateTime startDate, DateTime endDate);
        public Event Get(int id);
        public int Add(EventAddRequest request, int userId);
        public void Update(EventUpdateRequest request, int userId);
    }
}
