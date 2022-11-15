namespace Web.Api.Controllers
{
    [Route("api/events")]
    [ApiController]
    public class EventApiController : ControllerBase
    {
        private IEventService _service = null;
        private IAuthenticationService<int> _authService = null;

        public EventApiController(IEventService service, IAuthenticationService<int> authService)
        {
            _service = service;
            _authService = authService;
        }
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Event>>> Pagination(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> paged = _service.Pagination(pageIndex, pageSize);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found.");
                }
                else
                {
                    ItemResponse<Paged<Event>> result = new ItemResponse<Paged<Event>>();
                    result.Item = paged;
                    code = 200;
                    return StatusCode(code, result);
                }
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"General Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Event>>> SearchPaginated(int pageIndex, int pageSize, DateTime startDate, DateTime endDate)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Event> paged = _service.SearchPaginated(pageIndex, pageSize, startDate, endDate);
                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Records not found.");
                }
                else
                {
                    ItemResponse<Paged<Event>> result = new ItemResponse<Paged<Event>>();
                    result.Item = paged;
                    code = 200;
                    return StatusCode(code, result);
                }
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"General Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Event>> GetById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {

                Event _event = _service.Get(id);

                if (_event == null)
                {
                    code = 404;
                    response = new ErrorResponse("Record not found.");
                }
                else
                {
                    code = 200;
                    response = new ItemResponse<Event> { Item = _event };
                }
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"Argument Exception Error: {argEx.Message}");
            }
            catch(Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(EventAddRequest request)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 201;
            BaseResponse response = null;

            try
            {
                int id = _service.Add(request, userId);
                code = 201;
                response = new ItemResponse<int> { Item = id };
            }
            catch (SqlException sqlEx)
            {
                code = 500;

                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;

                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;

                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(EventUpdateRequest request)
        {
            int userId = _authService.GetCurrentUserId();
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Update(request, userId);
                response = new SuccessResponse();
            }
            catch (SqlException sqlEx)
            {
                code = 500;
                response = new ErrorResponse($"SqlException Error: {sqlEx.Message}");
            }
            catch (ArgumentException argEx)
            {
                code = 500;
                response = new ErrorResponse($"ArgumentException Error: {argEx.Message}");
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse($"Generic Exception Error: {ex.Message}");
            }

            return StatusCode(code, response);
        }
    
    }
}
