using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APM.WebAPI.Models
{
    public class Product
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ProductCode { get; set; }
        public int ProductId { get; set; }

        [Required]
        [MinLength(6, ErrorMessage= "Minimum length must be 6 chars")]
        public string ProductName { get; set; }
        public DateTime ReleaseDate { get; set; }
        public decimal Cost { get; set; }
        public string Catagory { get; set; }
        public List<string> Tags { get; set; }
        public string ImageUrl { get; set; }
    }
}